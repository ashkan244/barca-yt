#!/usr/bin/env bash
# Original, synthesised SFX + ambient music beds (no third-party licences needed).
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)/studio/public"
mkdir -p "$ROOT/sfx" "$ROOT/music"
S="$ROOT/sfx"; M="$ROOT/music"; TMPD="$ROOT/../.audio-tmp"; mkdir -p "$TMPD"
q() { ffmpeg -loglevel error -y "$@"; }

q -f lavfi -i "anoisesrc=d=0.7:c=pink:a=0.6" -af "highpass=f=350,lowpass=f=3800,afade=t=in:d=0.28,afade=t=out:st=0.3:d=0.4,volume=0.8" -ar 44100 -ac 2 "$S/whoosh.wav"
q -f lavfi -i "anoisesrc=d=0.55:c=white:a=0.5" -af "bandpass=f=3200:w=2400,tremolo=f=22:d=0.85,afade=t=in:d=0.03,afade=t=out:st=0.4:d=0.15,volume=0.6" -ar 44100 -ac 2 "$S/chalk.wav"
q -f lavfi -i "sine=f=1900:d=0.035" -af "afade=t=out:st=0.005:d=0.03,volume=0.5" -ar 44100 -ac 2 "$S/tick.wav"
q -f lavfi -i "sine=f=52:d=1.1" -f lavfi -i "anoisesrc=d=1.1:c=brown:a=0.8" -filter_complex "[0]volume=1.0[a];[1]lowpass=f=180,volume=0.7[b];[a][b]amix=inputs=2,afade=t=out:st=0.05:d=1.0,volume=1.4" -ar 44100 -ac 2 "$S/impact.wav"
q -f lavfi -i "anoisesrc=d=5:c=brown:a=0.9" -f lavfi -i "anoisesrc=d=5:c=pink:a=0.4" -filter_complex "[0]lowpass=f=1100,highpass=f=120[a];[1]bandpass=f=1800:w=900,tremolo=f=0.7:d=0.4[b];[a][b]amix=inputs=2,afade=t=in:d=1.2,afade=t=out:st=3.5:d=1.5,volume=0.9" -ar 44100 -ac 2 "$S/crowd.wav"
q -f lavfi -i "aevalsrc='0.25*sin(2*PI*(180+260*t)*t)':d=2:s=44100" -f lavfi -i "anoisesrc=d=2:c=pink:a=0.3" -filter_complex "[1]highpass=f=800,afade=t=in:d=1.8[n];[0][n]amix=inputs=2,afade=t=in:d=1.5,afade=t=out:st=1.85:d=0.15" -ar 44100 -ac 2 "$S/riser.wav"
q -f lavfi -i "sine=f=880:d=0.09" -af "afade=t=out:st=0.01:d=0.08,volume=0.45" -ar 44100 -ac 2 "$S/pop.wav"
q -f lavfi -i "anoisesrc=d=0.25:c=white:a=0.3" -af "highpass=f=2500,afade=t=out:d=0.25,volume=0.5" -ar 44100 -ac 2 "$S/shutter.wav"

# Ambient beds: 4-chord progressions, 6 s per chord, soft sines + slow tremolo + echo -> 24 s seamless loop.
chord() { # $1=file $2..=freqs
  local out=$1; shift; local expr=""
  for fq in "$@"; do expr="${expr}${expr:+ + }sin(2*PI*${fq}*t)+0.35*sin(2*PI*${fq}*2*t)"; done
  q -f lavfi -i "aevalsrc='(${expr})/ $(( $# * 3 ))*(0.6+0.4*sin(2*PI*0.25*t))*min(1,t/1.2)*min(1,(6-t)/1.2)':d=6:s=44100" -ac 2 "$out"
}
bed() { # $1=name, then 4 chords each as quoted list
  local name=$1; shift; local i=0; local list=""
  for c in "$@"; do chord "$TMPD/bed_${name}_$i.wav" $c; list="${list}file 'bed_${name}_$i.wav'\n"; i=$((i+1)); done
  printf "$list" > "$TMPD/bed_${name}.txt"
  q -f concat -safe 0 -i "$TMPD/bed_${name}.txt" -af "lowpass=f=2200,aecho=0.8:0.7:420|900:0.35|0.22,volume=0.9" -b:a 160k "$M/$name.mp3"
}
bed chalk "220 261.63 329.63" "174.61 220 261.63" "130.81 164.81 196 261.63" "196 246.94 293.66"      # Am F C G  (tactics/teaching)
bed story "146.83 174.61 220" "116.54 146.83 174.61" "130.81 164.81 196" "110 138.59 164.81"          # Dm Bb C A (documentary)
bed hope  "130.81 164.81 196" "196 246.94 293.66" "220 261.63 329.63" "174.61 220 261.63"            # C G Am F (uplifting)
ls -la "$S" "$M"
