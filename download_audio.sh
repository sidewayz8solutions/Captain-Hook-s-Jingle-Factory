#!/bin/bash

# Download audio files from Dropbox to local audio directory
# Run this script to download all your jingle files locally

echo "🎵 Downloading Captain Hook's Jingle Factory audio files..."

# Create audio directory if it doesn't exist
mkdir -p audio

# Download each audio file
echo "Downloading Frank Can Fix It - 30 Sec..."
curl -L "https://www.dropbox.com/scl/fi/2whwnq0wybl3ixtadqk11/Frank-Can-Fix-It-30-SEC-MIX-16b44.1k.wav?rlkey=7het1wwchc1u7sp79ezky63cf&st=6ejm7nnz&dl=1" -o audio/frank-30sec.wav

echo "Downloading Frank Can Fix It - 60 Sec..."
curl -L "https://www.dropbox.com/scl/fi/g0blkuxt46b04t34mjggt/Frank-Can-Fix-It-60-SEC-MIX-16b44.1k.wav?rlkey=r1kdwdav0gy1i1mfho96ql0gm&st=iczoow16&dl=1" -o audio/frank-60sec.wav

echo "Downloading They All Ask For Frank - 30 Sec..."
curl -L "https://www.dropbox.com/scl/fi/z8g2yyt47dkmliuy8srw0/They-All-Ask-For-Frank-30-SEC-16b-44.1k.wav?rlkey=x48u7o1jf0vulz9f52974h1tr&st=uvmpj9kh&dl=1" -o audio/they-all-ask-30sec.wav

echo "Downloading They All Ask For Frank - 60 Sec..."
curl -L "https://www.dropbox.com/scl/fi/zx80y76z7ubiry9hal44w/They-All-Ask-For-Frank-60-SEC-16b-44.1k.wav?rlkey=hmmsri4b8x5k1vdwa6fa1m26d&st=msu8qqow&dl=1" -o audio/they-all-ask-60sec.wav

echo "Downloading Went On Down - 30 Sec..."
curl -L "https://www.dropbox.com/scl/fi/eqi8qhtid1b5vdzfwonrg/Went-On-Down-30-SEC-081125-FINAL-TK-3.wav?rlkey=vwcd7prnrejg9dbnrcjbb3cei&st=mwoqhggl&dl=1" -o audio/went-on-down-30sec.wav

echo "✅ All audio files downloaded successfully!"
echo "🚀 Now start your local server with: python3 -m http.server 8000"
echo "🌐 Then visit: http://localhost:8000/gallery.html"
