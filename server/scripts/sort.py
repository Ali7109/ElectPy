import os
import shutil
import time 

response = {}

def sort_files():
    # Get the current working directory
    current_directory = os.getcwd()

    # Iterate through all files in the current directory
    files = os.listdir(current_directory)
    for file in files:
        # Check if the file is a regular file (not a directory)
        if os.path.isfile(os.path.join(current_directory, file)):

            # Check if the file has an extension
            file_name, file_extension = os.path.splitext(file)
            
            formatted_extension =  file_extension[1:].upper()
            if formatted_extension == "IMG" or formatted_extension == "JPG" or formatted_extension == "JPEG" or formatted_extension == "PNG" or formatted_extension == "GIF" or formatted_extension == "SVG":
                formatted_extension = "IMAGES"
            
            dir_name = f"SORT {formatted_extension}" 

            # Skip files without extension or Python files
            if file_extension == "" or file_extension == ".py": 
                continue
            
            # Specify the directory to move files
            target_directory = os.path.join(current_directory+"/SORTED", dir_name)
            os.makedirs(target_directory, exist_ok=True)
            
            # Construct the full path to the source file
            source_file = os.path.join(current_directory, file)

            # Construct the destination path
            destination_file = os.path.join(target_directory, file)

            # Handle existing files in the target directory
            while os.path.exists(destination_file):

                # Append the current time in the format hhmm as an identifier
                current_time = time.strftime("%H%M")
                new_file_name = f"{file_name}_{current_time}{file_extension}"
                
                # If the new file name already exists, add a numeric suffix
                count = 1
                while os.path.exists(os.path.join(target_directory, new_file_name)):
                    new_file_name = f"{file_name}_{current_time}({count}){file_extension}"
                    count += 1
                
                destination_file = os.path.join(target_directory, new_file_name)

            # Move the file to the specified directory
            shutil.move(source_file, destination_file)
            response[dir_name] = response.get(dir_name, 0) + 1

def output_changes():
    if  not response:
        print("No files were moved")
        return
    for dir_name, count in response.items():
        print(f"{dir_name} moved {count} file(s)")

def main():
    sort_files()
    output_changes()

if __name__ == "__main__":
    main()
