require 'swagger_helper'

describe 'Comments API' do

  path '/api/features/{feature_id}/comments' do

    post 'Creates a comment for a feature' do
      tags 'Comments'
      consumes 'application/json'
      parameter name: :feature_id, in: :path, type: :string, required: true, description: 'ID of feature to comment on'
      parameter name: :comment, in: :body, schema: {
        type: :object,
        properties: {
          body: { type: :string }
        },
        required: ['body']
      }

      response '201', 'comment created' do
        let(:feature_id) { 'nc74030026' }
        let(:comment) { { body: 'This is a comment' } }
        run_test!
      end

      response '404', 'feature not found' do
        let(:feature_id) { 'invalid' }
        run_test!
      end
    end
  end
end
