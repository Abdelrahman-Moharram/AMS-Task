import pandas as pd

def to_int(val, default):
    if val:
        try:
            return int(val)
        except:
            pass
    return default

def read_data(file):
    df = pd.read_csv(file)

    return df