# stałe
gravity_acceleration = 9.80665      # metry na sekundę do kwadratu

# parametry symulacji
setpoint = 0.0                      # radiany
simulation_time = 10                # sekundy
sampling_time = 0.05                # sekundy
timeout = 0                         # ilość próbek
max_moment = 1.0                    # moment siły

# parametry wahadła
pendulum_mass = 1.0                 # kilogramy
pendulum_length = 1.0               # metry
pendulum_friction = 0.1             # współczynnik

# domyślne współczynniki regulatorów
proportional = 1.0                  # współczynnik
integral = 1.0                      # współczynnik
derivative = 1.0                    # współczynnik

# zmienne obiektu
output_signal = 0.0                 # radiany
pendulum_speed = 0.0                # prędkość kątowa w radianach
pendulum_acceleration = 0.0         # przyśpieszenie kątowe w radianach

# zmienne regulatora pid
last_err_signal = 0.0               # radiany
proportional_value = 0.0            # radiany
integral_value = 0.0                # radiany
derivative_value = 0.0              # radiany

# fuzzy kontroler
linguistic_size = 7
last_error_signal = 0.0
error_part = 0.0
error_derivative_part = 0.0
output_part = 0.0
error_linguistic_area = []
error_derivative_linguistic_area = []
output_linguistic_area = []
output_linguistic_matrix = []

# fuzzzy kontroler - ustawienie użytkownika
fuzzy_error_min = -0.5
fuzzy_derivative_min = -0.5
fuzzy_control_min = -0.5
fuzzy_error_max = 0.5
fuzzy_derivative_max = 0.5
fuzzy_control_max = 0.5
