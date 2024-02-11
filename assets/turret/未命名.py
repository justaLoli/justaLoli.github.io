from pydub import AudioSegment

def convert_wav_to_opus(input_wav_file, output_ogg_file):
    # Load the wav file
    sound = AudioSegment.from_wav(input_wav_file)

    # Convert to opus format
    sound.export(output_ogg_file, format="opus")

# 输入wav文件名和输出ogg文件名
input_wav_file = "Turret_turretlightbridgeblock01.wav"
output_ogg_file = "Turret_turretlightbridgeblock01.ogg"

# 调用函数进行转换
convert_wav_to_opus(input_wav_file, output_ogg_file)

print("转换完成，主人！")
