namespace :fetch_features do
  desc 'Fetch and persist earthquake data from USGS'
  task fetch: :environment do
    require 'open-uri'
    require 'json'

    url = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson'
    data = JSON.parse(URI.open(url).read)

    data['features'].each do |feature|
      properties = feature['properties']
      geometry = feature['geometry']['coordinates']

      next if properties['mag'].nil? || properties['place'].nil? || properties['time'].nil? ||
              properties['url'].nil? || properties['magType'].nil? || properties['title'].nil? ||
              geometry[0].nil? || geometry[1].nil?

      Feature.find_or_create_by(external_id: feature['id']) do |new_feature|
        new_feature.magnitude = properties['mag']
        new_feature.place = properties['place']
        new_feature.time = Time.at(properties['time'] / 1000)
        new_feature.url = properties['url']
        new_feature.tsunami = properties['tsunami'] == 1
        new_feature.mag_type = properties['magType']
        new_feature.title = properties['title']
        new_feature.longitude = geometry[0]
        new_feature.latitude = geometry[1]
      end
    end
  end
end
