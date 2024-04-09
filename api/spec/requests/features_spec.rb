# spec/requests/features_spec.rb
require 'swagger_helper'

describe 'Features API' do

  path '/api/features' do

    get 'Retrieves all features' do
      tags 'Features'
      produces 'application/json'
      parameter name: :page, in: :query, type: :integer, description: 'Page number'
      parameter name: :per_page, in: :query, type: :integer, description: 'Number of items per page'
      parameter name: :mag_type, in: :query, type: :string, description: 'Filter by magnitude type'
    
      response '200', 'features found' do
        schema type: :object,
          properties: {
            data: {
              type: :array,
              items: {
                type: :object,
                properties: {
                  id: { type: :integer },
                  external_id: { type: :string },
                  title: { type: :string },
                  magnitude: { type: :number, format: :float },
                  place: { type: :string },
                  mag_type: { type: :string },
                  url: { type: :string, format: 'uri', 'x-nullable': true },
                  tsunami: { type: :boolean },
                  coordinates: {
                    type: :object,
                    properties: {
                      latitude: { type: :number, format: :float },
                      longitude: { type: :number, format: :float }
                    }
                  },
                  links: {
                    type: :object,
                    properties: {
                      external_url: { type: :string, format: 'uri' }
                    }
                  }
                }
              }
            },
            pagination: {
              type: :object,
              properties: {
                current_page: { type: :integer },
                total: { type: :integer },
                per_page: { type: :integer }
              }
            }
          },
          required: ['data', 'pagination']
        run_test!
      end
    end
  end
end
