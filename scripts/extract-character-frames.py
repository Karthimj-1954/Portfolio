#!/usr/bin/env python3
"""
scripts/extract-character-frames.py

Repeatable OpenCV frame extraction utility for cursor-tracking 3D character hero.
Extracts directional poses from public/character.mp4 and exports optimized WebP frames
to public/frames/ along with a neutral center pose (center.webp) and manifest.json.

Directional sequence in source animation:
Center -> Up -> Upper-right -> Right -> Lower-right -> Down -> Lower-left -> Left -> Upper-left -> Center
"""

import os
import sys
import argparse
import json
import cv2

def parse_args():
    parser = argparse.ArgumentParser(description="Extract directional character frames from MP4 video for cursor tracking.")
    parser.add_argument("--video", default="public/character.mp4", help="Path to input character.mp4")
    parser.add_argument("--output", default="public/frames", help="Output directory for WebP frames")
    parser.add_argument("--target-frames", type=int, default=64, help="Target directional frame count (max 64)")
    parser.add_argument("--quality", type=int, default=95, help="WebP compression quality (1-100)")
    parser.add_argument("--resize", type=int, default=800, help="Max dimension to resize frames for optimal canvas load (0 = original)")
    return parser.parse_args()

def inspect_and_extract():
    args = parse_args()
    video_path = os.path.abspath(args.video)
    output_dir = os.path.abspath(args.output)

    print("=================================================================")
    print("  KJ NEXUS — Cursor-Tracking Character Frame Extractor")
    print("=================================================================")
    print(f"Target Video   : {video_path}")
    print(f"Output Directory: {output_dir}")
    print(f"Target Frames  : {args.target_frames}")
    print(f"WebP Quality   : {args.quality}")
    print("-----------------------------------------------------------------")

    if not os.path.exists(video_path):
        print("\n[ERROR] Source video not found:")
        print(f"  {video_path}")
        print("\n[ACTION REQUIRED]:")
        print("1. Generate a continuous directional head-turn video using Google Flow or Luma/Runway")
        print("   Reference image: public/character.png")
        print("   Direction sequence: Center -> Up -> Up-Right -> Right -> Down-Right -> Down -> Down-Left -> Left -> Up-Left -> Center")
        print("   Camera: Stationary frontal, head-and-shoulders, dark pure black background (#050505)")
        print(f"2. Save the resulting MP4 as '{args.video}'")
        print("3. Re-run this script: python scripts/extract-character-frames.py")
        sys.exit(1)

    cap = cv2.VideoCapture(video_path)
    if not cap.isOpened():
        print(f"\n[ERROR] OpenCV failed to open video file: {video_path}")
        print("Please check codec compatibility (H.264 / MP4 recommended).")
        sys.exit(1)

    total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
    fps = cap.get(cv2.CAP_PROP_FPS) or 30.0
    width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
    height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
    duration_sec = total_frames / fps if fps > 0 else 0

    print(f"\n[VIDEO METADATA]")
    print(f"  Resolution : {width} x {height}")
    print(f"  Total Frames: {total_frames}")
    print(f"  Frame Rate : {fps:.2f} FPS")
    print(f"  Duration   : {duration_sec:.2f} seconds")

    if total_frames < 8:
        print("\n[WARNING] Video has fewer than 8 frames. Insufficient directional coverage.")
        print("A complete 360-degree head movement requires at least 16 to 64 distinct directional poses.")
        sys.exit(1)

    os.makedirs(output_dir, exist_ok=True)

    # Determine frame step based on available frames and target
    usable_target = min(args.target_frames, total_frames)
    step = total_frames / float(usable_target)

    extracted_filenames = []
    print(f"\nExtracting {usable_target} directional frames to WebP...")

    for i in range(usable_target):
        frame_idx = int(i * step)
        cap.set(cv2.CAP_PROP_POS_FRAMES, frame_idx)
        ret, frame = cap.read()
        if not ret or frame is None:
            print(f"  Warning: failed to read frame at index {frame_idx}")
            continue

        if args.resize > 0 and (width > args.resize or height > args.resize):
            scale = args.resize / max(width, height)
            new_w = int(width * scale)
            new_h = int(height * scale)
            frame = cv2.resize(frame, (new_w, new_h), interpolation=cv2.INTER_AREA)

        filename = f"frame_{i:02d}.webp"
        filepath = os.path.join(output_dir, filename)
        cv2.imwrite(filepath, frame, [cv2.IMWRITE_WEBP_QUALITY, args.quality])
        extracted_filenames.append(filename)

    # Save first frame or neutral frame as center.webp if not already present
    center_path = os.path.join(output_dir, "center.webp")
    cap.set(cv2.CAP_PROP_POS_FRAMES, 0)
    ret, center_frame = cap.read()
    if ret and center_frame is not None:
        if args.resize > 0 and (width > args.resize or height > args.resize):
            scale = args.resize / max(width, height)
            center_frame = cv2.resize(center_frame, (int(width * scale), int(height * scale)), interpolation=cv2.INTER_AREA)
        cv2.imwrite(center_path, center_frame, [cv2.IMWRITE_WEBP_QUALITY, args.quality])
        print(f"Saved neutral center pose: {center_path}")

    cap.release()

    manifest = {
        "sourceVideo": args.video,
        "totalFramesExtracted": len(extracted_filenames),
        "sourceTotalFrames": total_frames,
        "sourceFps": fps,
        "durationSec": duration_sec,
        "dimensions": [width, height],
        "neutralFrame": "center.webp",
        "frameFiles": extracted_filenames,
        "directionalMapping": "linear_clockwise_from_center_up",
        "notes": "Direction sequence: Center -> Up -> Up-Right -> Right -> Down-Right -> Down -> Down-Left -> Left -> Up-Left -> Center"
    }

    manifest_path = os.path.join(output_dir, "manifest.json")
    with open(manifest_path, "w", encoding="utf-8") as f:
        json.dump(manifest, f, indent=2)

    print(f"\nManifest written to: {manifest_path}")
    print(f"Successfully extracted {len(extracted_filenames)} frames into {output_dir}")
    print("=================================================================\n")

if __name__ == "__main__":
    inspect_and_extract()
