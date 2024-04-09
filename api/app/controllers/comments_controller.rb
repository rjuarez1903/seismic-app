class CommentsController < ApplicationController
  skip_before_action :verify_authenticity_token

  def create
    feature = Feature.find_by(external_id: params[:feature_id])

    if feature
      comment = feature.comments.create(comment_params)

      if comment.persisted?
        render json: comment, status: :created
      else
        render json: { errors: comment.errors.full_messages }, status: :unprocessable_entity
      end
    else
      render json: { error: 'Feature not found' }, status: :not_found
    end
  end

  private

  def comment_params
    params.require(:comment).permit(:body)
  end
end
