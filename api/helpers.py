def check_float(value):
    if not type(value) == int and not type(value) == float and not type(value) == str:
        return False
    try:
        float(value)
        return True
    except ValueError:
        return False


def check_int(value):
    if not type(value) == int and not type(value) == float and not type(value) == str:
        return False
    try:
        int(value)
        return True
    except ValueError:
        return False