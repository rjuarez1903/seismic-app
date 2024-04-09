# app/serializers/feature_serializer.rb
class FeatureSerializer < ActiveModel::Serializer
  attributes :external_id, :magnitude, :place, :tsunami, :mag_type, :title

  attribute :id do
    object.id
  end

  attribute :type do
    'feature'
  end

  attribute :coordinates do
    {
      longitude: object.longitude,
      latitude: object.latitude
    }
  end

  attribute :links do
    {
      external_url: object.url
    }
  end

  def time
    object.time.iso8601
  end
end
