class Comment < ApplicationRecord
  belongs_to :feature, primary_key: :external_id, foreign_key: :feature_id
  validates :body, presence: true
end
