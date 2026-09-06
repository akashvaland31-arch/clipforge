import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import crypto from "crypto";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const form = await req.formData();
    const file = form.get("file");
    if (!(file instanceof File)) {
      return NextResponse.json({ error: "No video file supplied." }, { status: 400 });
    }
    if (!file.type.startsWith("video/")) {
      return NextResponse.json({ error: "Please upload a video file." }, { status: 400 });
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const id = crypto.randomUUID();
    const ext = file.name.split(".").pop() || "mp4";
    const path = `${id}/source.${ext}`;
    const buffer = Buffer.from(await file.arrayBuffer());

    const { error: uploadError } = await supabase.storage
      .from("videos")
      .upload(path, buffer, { contentType: file.type, upsert: false });

    if (uploadError) throw uploadError;

    const { error: dbError } = await supabase.from("jobs").insert({
      id,
      source_path: path,
      status: "queued",
      credits_used: 1
    });

    if (dbError) throw dbError;

    return NextResponse.json({ jobId: id });
  } catch (e: any) {
    return NextResponse.json({ error: e.message || "Upload failed." }, { status: 500 });
  }
}