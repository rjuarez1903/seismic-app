# app/models/feature.rb
class Feature < ApplicationRecord
  validates :title, :url, :place, :mag_type, :longitude, :latitude, presence: true
  validates :magnitude, numericality: { greater_than_or_equal_to: -1.0, less_than_or_equal_to: 10.0 }
  validates :latitude, numericality: { greater_than_or_equal_to: -90.0, less_than_or_equal_to: 90.0 }
  validates :longitude, numericality: { greater_than_or_equal_to: -180.0, less_than_or_equal_to: 180.0 }
  has_many :comments, primary_key: :external_id, foreign_key: :feature_id, dependent: :destroy
end
