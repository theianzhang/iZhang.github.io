import json
import geopy.distance

# creates two files, one javascript call back function to be written to, and one input file that is the Takout json data from Google Maps timeline location history
# .gitgnore removes all Takeout location history for privacy purposes
with open('../js/location_callback.js', 'x') as location_callback, open('Takeout/location_dump/location_history.json', 'r') as location_dump:
	#instantiate new dict for storing lat long
	latDict = {}
	# writes beginning of location call back array function	
	location_callback.write('location_array({' + '\n' + '"type":"FeatureCollection",' + '\n' + '"features":[' + '\n')
	data = json.load(location_dump)
	# loop through all features in locations array
	for i in data['locations']:
		#instantiate human friendly latlng for debugging and readability
		hfLat = "{0:.4f}".format(i['latitudeE7'] / 10000000)
		hfLong = "{0:.4f}".format(i['longitudeE7'] / 10000000)
		#print(hfLat, hfLong)
		#check if activity exists, if accuracy exists, and if accuracy is within 25 meters
		if 'activity' in i and 'accuracy' in i and i['accuracy'] < 25:
			#check if type exists
			if 'type' in i['activity'][0]['activity'][0]:
				#check if type is STILL and confidence is 100
				if i['activity'][0]['activity'][0]['type'] == 'STILL' and i['activity'][0]['activity'][0]['confidence'] == 100:
					#check for uniqueness to reduce marker density
					if hfLat in latDict.keys():
						if hfLong not in latDict[hfLat]:
							latDict[hfLat].append(hfLong)
							location_callback.write('{' + '\n' + '"type":"Feature",' + '\n' + '"properties":{},' + '\n' + '"timestamp":' + str(i['timestampMs']) + ',' + '\n' + '"geometry":{' + '\n' + '"type":"Point",' + '\n' +  '"coordinates":[' + '\n' + str(i['latitudeE7'] / 10000000) + ',' + '\n' + str(i['longitudeE7'] / 10000000) + '\n' + ']}},' + '\n')
						else:
							pass
					else:
						latDict[hfLat] = [hfLong]
				else:
					pass
			else:
				pass
		else:
			pass
	# writes end of location call back array function
	location_callback.write(']});')

# 	may have made a dumb mistake here and checked for latlng uniqueness instead of distance between points
# 	elif (i['latitudeE7'] in latDict.keys() and latDict[i['latitudeE7']] != i['longitudeE7']) or (i['longitudeE7'] in longDict.keys() and longDict[i['longitudeE7']] != i['latitudeE7']):
#	assuming latitude is already in dict, check if longitude is already in dict. if not, then location is unique.
# 	longDict = {}
#	if i['longitudeE7'] not in longDict.keys():
#		longDict[i['longitudeE7']] = i[i'latitudeE7']

# loop through dict and check vincenty distance
# for k in latDict.keys():
# 	for j in latDict[k]:
# 		#instantiate tuples to compare latlngs
# 		coords_1 = (hfLat, hfLong)
# 		coords_2 = (k, j)
# 		isTooClose = False
# 		if geopy.distance.distance(coords_1, coords_2).miles < .1:
# 			isTooClose = True
# 			continue
# 		else: 
# 			pass
# if isTooClose is False:	
# 	print("got to writing")	