import cv2, numpy as np, os, requests
from io import BytesIO
from PIL import Image

def url_to_image(url):
    response = requests.get(url)
    if response.status_code == 200:
        img = Image.open(BytesIO(response.content)).convert('RGBA')
        img = np.array(img)
        img = cv2.cvtColor(img, cv2.COLOR_RGBA2BGRA)  # Convert RGB to BGR for openCV format
        return img

    else:
        print("Failed to download image:", response.status_code)
        return None

def download(file_name, image):
    downloads_folder = os.path.join(os.path.expanduser('~'), 'Downloads')
    file_path = os.path.join(downloads_folder, file_name)

    # If the file already exists
    if os.path.exists(file_path):
        counter = 1
        while True:
            new_file_name = f"{os.path.splitext(file_name)[0]}-{counter}{os.path.splitext(file_name)[1]}"
            new_file_path = os.path.join(downloads_folder, new_file_name)
            if not os.path.exists(new_file_path):
                file_path = new_file_path
                break
            counter += 1
    cv2.imwrite(file_path, image)

def scale(image):
    desired_width = 250
    desired_height = 150
    height, width = image.shape[:2]
    aspect_ratio = width / height

    if width > desired_width or height > desired_height:
        if aspect_ratio > (desired_width / desired_height):
            new_width = desired_width
            new_height = int(new_width / aspect_ratio)
        else:
            new_height = desired_height
            new_width = int(new_height * aspect_ratio)
    else:
        new_width = width
        new_height = height
        
    image = cv2.resize(image, (new_width, new_height), interpolation=cv2.INTER_AREA)
    canvas = np.zeros((desired_height, desired_width, 4), dtype=np.uint8)
    canvas[:, :, 3] = 0
    x_offset = (desired_width - new_width) // 2
    y_offset = (desired_height - new_height) // 2
    canvas[y_offset:y_offset+new_height, x_offset:x_offset+new_width, :] = image  
    return canvas

def resize(url, file_name):
    image = url_to_image(url)
    image = scale(image)
    file_name += ".WebP" # Use WebP extension for good SEO
    download(file_name, image)
