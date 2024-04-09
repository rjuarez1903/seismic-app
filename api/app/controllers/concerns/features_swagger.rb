module FeaturesSwagger
  include Swagger::Blocks

  swagger_path '/api/features' do
    operation :get do
      key :summary, 'List all features'
      key :description, 'Returns all features with pagination'
      key :operationId, 'listFeatures'
      key :produces, ['application/json']
      key :tags, ['Feature']
      parameter do
        key :name, :page
        key :in, :query
        key :description, 'Page number'
        key :required, false
        key :type, :integer
      end
      parameter do
        key :name, :per_page
        key :in, :query
        key :description, 'Number of items per page'
        key :required, false
        key :type, :integer
      end
      parameter do
        key :name, :mag_type
        key :in, :query
        key :description, 'Filter by magnitude type'
        key :required, false
        key :type, :string
      end
      response 200 do
        key :description, 'Features list'
        schema type: :object do
          property :data do
            key :type, :array
            items do
              key :'$ref', :Feature
            end
          end
          property :pagination do
            key :'$ref', :Pagination
          end
        end
      end
    end
  end

  swagger_schema :Feature do
    key :required, [:id, :title, :magnitude, :place, :mag_type, :coordinates, :external_id, :url, :tsunami]
    
    property :id do
      key :type, :integer
    end
    
    property :external_id do
      key :type, :string
    end
    
    property :title do
      key :type, :string
    end
    
    property :magnitude do
      key :type, :number
      key :format, :float
    end
    
    property :place do
      key :type, :string
    end
    
    property :mag_type do
      key :type, :string
    end
    
    property :url do
      key :type, :string
    end
    
    property :tsunami do
      key :type, :boolean
    end
    
    property :coordinates do
      key :type, :object
      property :latitude do
        key :type, :number
        key :format, :float
      end
      property :longitude do
        key :type, :number
        key :format, :float
      end
    end
  end
  
  swagger_schema :Pagination do
    property :current_page do
      key :type, :integer
    end
    property :total do
      key :type, :integer
    end
    property :per_page do
      key :type, :integer
    end
  end
end
