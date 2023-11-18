import cv2
import os
import numpy as np
from src.main.utils.Logger import logger
import subprocess




# Parameters
FRAMES_FOLDER = ".tmp/frames"  # Directory where you want to save the image frames
VIDEO_FOLDER = ".tmp/video"

# Assuming you have an array of frames (each frame is a NumPy array)
# For demonstration purposes, let's create a simple example array
frame_dimensions = (256, 256, 3)  # (height, width, channels)
num_frames = 100
frames = [[0,0,0] for _ in range(400)]

frames.extend([[256, 256, 256] for i in range(300)])

frames.extend([[0,0,0] for i in range(900)])

# Create the output folder if it doesn't exist
os.makedirs(FRAMES_FOLDER, exist_ok=True)

def generate_frames() -> None:

    # Save the frames as PNG images
    for i, frame in enumerate(frames):
        # Define the file name for the frame (e.g., 0001.png, 0002.png, etc.)
        file_name = f"{FRAMES_FOLDER}/{i+1:04d}.png"  # Adjust the file naming as needed

        # Save the frame as a PNG image
        cv2.imwrite(file_name, frame)

    logger.info("Frames saved as PNG images to %s", FRAMES_FOLDER)

def generate_video() -> None:
    input_folder = FRAMES_FOLDER  # Directory containing your PNG frames
    output_file = 'output.mp4'

    # Define the FFmpeg command as a list of arguments
    ffmpeg_cmd = [
        'ffmpeg',
        '-framerate', '30',
        '-i', f'{input_folder}/%04d.png',
        '-c:v', 'libx264',
        '-preset', 'ultrafast',
        '-crf', '1',
        '-pix_fmt', 'yuv420p',
        output_file
    ]

    # Run the FFmpeg command
    subprocess.run(ffmpeg_cmd)


    logger.info("Video creation complete, in %s", VIDEO_FOLDER)