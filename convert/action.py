# import pandas as pd
# import json

# def json_to_csv(json_file, csv_file):
#     # Load JSON data
#     with open(json_file, 'r', encoding='utf-8') as file:
#         data = json.load(file)
    
#     # Convert JSON to DataFrame
#     df = pd.DataFrame(data)
    
#     # Save DataFrame to CSV
#     df.to_csv(csv_file, index=False, encoding='utf-8')

# # Example usage
# if __name__ == "__main__":
#     json_file_path = 'wards_full.json'  # Replace with your JSON file path
#     csv_file_path = 'commune.csv'  # Replace with your desired CSV file path
#     json_to_csv(json_file_path, csv_file_path)

import pandas as pd
def load_json(json_file):
    """
    Load a JSON file into a pandas DataFrame.

    Args:
        json_file (str): Path to the JSON file.

    Returns:
        pd.DataFrame: The loaded DataFrame.
    """
    try:
        # Load the JSON file
        df = pd.read_json(json_file, encoding='utf-8')
        print("JSON file loaded successfully.")
        return df
    except Exception as e:
        print(f"An error occurred while loading the JSON file: {e}")
        return None
def load_csv(csv_file):
    """
    Load a CSV file into a pandas DataFrame.

    Args:
        csv_file (str): Path to the CSV file.

    Returns:
        pd.DataFrame: The loaded DataFrame.
    """
    try:
        # Load the CSV file
        df = pd.read_csv(csv_file, encoding='utf-8')
        print("CSV file loaded successfully.")
        return df
    except Exception as e:
        print(f"An error occurred while loading the CSV file: {e}")
        return None

def slice_dataframe(df, start_row, end_row):
    """
    Slice a DataFrame from start_row to end_row.

    Args:
        df (pd.DataFrame): The DataFrame to slice.
        start_row (int): The starting row index.
        end_row (int): The ending row index.

    Returns:
        pd.DataFrame: The sliced DataFrame.
    """
    return df.iloc[start_row:end_row]

def save_dataframe_to_csv(df, csv_file):
    """
    Save a DataFrame to a CSV file.

    Args:
        df (pd.DataFrame): The DataFrame to save.
        csv_file (str): Path to the output CSV file.
    """
    try:
        df.to_csv(csv_file, index=False, encoding='utf-8')
        print(f"DataFrame saved to {csv_file} successfully.")
    except Exception as e:
        print(f"An error occurred while saving the DataFrame: {e}")

# Example usage
if __name__ == "__main__":
    # python -m convert.action {path_file_json}
    # get the path of the JSON file from command line arguments
    import sys
    # Check if the script is run with a command line argument
    if len(sys.argv) < 2:
        print("Please provide the path to the JSON file.")
        sys.exit(1)
    # Get the JSON file path from command line arguments
    json_file_path = sys.argv[1]

    folder = json_file_path.split('/')[:-1]
    folder = '/'.join(folder) + '/'
    df = load_json(json_file_path)
    # max_length = df['name'].str.len().max()
    if df is not None:
        # Slice the DataFrame
        sliced_df = slice_dataframe(df, 0, 10)  # Adjust the row indices as needed
        
        # Save the sliced DataFrame to CSV
        csv_file_path = folder + 'commune.csv'
        save_dataframe_to_csv(df, csv_file_path)

