import { NextRequest, NextResponse } from "next/server";
import { spawn } from "child_process";
import path from "path";

type RequestBody = {
  videoUrl?: string | null;
  matchId?: string;
};

export async function POST(req: NextRequest) {
  try {
    console.log("🔥 API route hit: /api/ai/ai-function");

    const body = (await req.json()) as RequestBody;
    const videoUrl = body.videoUrl ?? null;
    const matchId = body.matchId;

    console.log("📥 Received data:", { videoUrl, matchId });

    if (!videoUrl) {
      console.log("❌ Missing videoUrl");
      return NextResponse.json(
        { success: false, error: "Missing videoUrl" },
        { status: 400 }
      );
    }

    const scriptPath = path.join(process.cwd(), "app", "Ai-Dev", "ModelV6.py");

    console.log("🚀 Running Python script...");
    console.log("📂 Script path:", scriptPath);
    console.log("🎥 Video URL:", videoUrl);

    const pyProcess = spawn("python", [scriptPath, videoUrl], {
      cwd: process.cwd(),
      env: process.env,
    });

    let output = "";
    let errorOutput = "";

    pyProcess.stdout.on("data", (data: Buffer) => {
      const text = data.toString();
      console.log("🐍 Python stdout:", text);
      output += text;
    });

    pyProcess.stderr.on("data", (data: Buffer) => {
      const text = data.toString();
      console.error("🐍 Python stderr:", text);
      errorOutput += text;
    });

    pyProcess.on("error", (err: Error) => {
      console.error("❌ Failed to start Python:", err.message);
      errorOutput += err.message;
    });

    return await new Promise<Response>((resolve) => {
      pyProcess.on("close", (code: number | null) => {
        console.log("🏁 Python process finished with code:", code);

        if (code === 0) {
          resolve(
            NextResponse.json({
              success: true,
              output: output.trim(),
              matchId,
            })
          );
        } else {
          resolve(
            NextResponse.json(
              {
                success: false,
                error:
                  errorOutput.trim() ||
                  `Python exited with code ${code ?? "unknown"}`,
                output: output.trim(),
                matchId,
              },
              { status: 500 }
            )
          );
        }
      });
    });
  } catch (error) {
    console.error("💥 API error:", error);

    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error ? error.message : "Failed to run script",
      },
      { status: 500 }
    );
  }
}