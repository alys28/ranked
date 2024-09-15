import json

def in_json(name, json_data):
    for json_item in json_data:
        if json_item.get("name") == name:
            return True
    return False

def get_last_item_id(json_data):
    if json_data:
        return json_data[-1].get("id", 0)
    return 0

def check_id(name):
    file_path = 'products.json'
    try:
        with open(file_path, 'r') as file:
            json_data = json.load(file)
        
        if in_json(name, json_data):
            return "exists"
        else:
            new_entry = {
                "id": get_last_item_id(json_data) + 1,
                "name": name
            }
            json_data.append(new_entry)
            
            with open(file_path, 'w') as file:
                json.dump(json_data, file, indent=4)
            return "does not exist"
    
    except FileNotFoundError:
        print(f"File {file_path} not found.")
        return None
    except json.JSONDecodeError:
        print(f"Error decoding JSON from the file {file_path}.")
        return None
    except Exception as e:
        print(f"An error occurred: {e}")
        return None