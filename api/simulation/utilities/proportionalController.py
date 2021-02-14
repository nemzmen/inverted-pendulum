from . import default


class ProportionalController:
    
    def __init__(self, proportional=None):
        self.proportional = default.proportional if proportional == None else proportional


    def get_output(self, error_signal):
        control_signal = self.proportional * error_signal
        
        return control_signal
