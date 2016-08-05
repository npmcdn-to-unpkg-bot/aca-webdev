from geopy.geocoders import Nominatim

def get_coordinates(plan_id, zipcode, state):
    geolocator = Nominatim()
    location = geolocator.geocode(state + " " + zipcode)
    center = [location.latitude, location.longitude]
    provider_array = [[51.5, -0.09], [51.51, -0.09], [51.53, -0.09]] #function of plan_id
    return (center, provider_array)
