require 'rails_helper'

RSpec.describe 'Comments', type: :request do
  describe 'POST /api/features/:feature_id/comments' do
    let!(:feature) { Feature.create!(external_id: '123', title: 'Title', url: 'http://example.com', place: 'Place', mag_type: 'ml', magnitude: 5.5, longitude: 0, latitude: 0) }

    it 'creates a new comment for the feature' do
      expect do
        post "/api/features/#{feature.external_id}/comments", params: { comment: { body: 'A new comment' } }
      end.to change(Comment, :count).by(1)

      expect(response).to have_http_status(:created)
    end

    it 'returns an error when the body is missing' do
      post "/api/features/#{feature.external_id}/comments", params: { comment: { body: nil } }

      expect(response).to have_http_status(:unprocessable_entity)
      expect(JSON.parse(response.body)['errors']).to include("Body can't be blank")
    end
  end
end
