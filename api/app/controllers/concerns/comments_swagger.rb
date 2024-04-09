module CommentsSwagger
  include Swagger::Blocks

  swagger_path '/api/features/{feature_id}/comments' do
    operation :post do
      key :summary, 'Create a comment for a feature'
      key :description, 'Adds a comment to the specified feature'
      key :operationId, 'addFeatureComment'
      key :produces, ['application/json']
      key :tags, ['Comment']
      parameter do
        key :name, :feature_id
        key :in, :path
        key :description, 'ID of feature to comment on'
        key :required, true
        key :type, :string
      end
      parameter do
        key :name, :body
        key :in, :body
        key :description, 'Comment body'
        key :required, true
        schema do
          key :'$ref', :CommentInput
        end
      end
      response 201 do
        key :description, 'Comment created'
      end
      response 404 do
        key :description, 'Feature not found'
      end
    end
  end

  swagger_schema :CommentInput do
    key :required, [:body]
    property :body do
      key :type, :string
    end
  end
end
