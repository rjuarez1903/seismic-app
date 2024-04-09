class FeaturesController < ApplicationController
  skip_before_action :verify_authenticity_token

  def index
    features = Feature.all

    features = features.where(mag_type: params[:mag_type]) if params[:mag_type].present?

    per_page = calculate_per_page(params[:per_page])

    features = features.page(params[:page] || 1).per(per_page)

    render json: {
      data: ActiveModelSerializers::SerializableResource.new(features, each_serializer: FeatureSerializer).as_json,
      **pagination_dict(features)
    }
  end

  private

  def pagination_dict(collection)
    {
      pagination: {
        current_page: collection.current_page,
        total: collection.total_pages,
        per_page: calculate_per_page(params[:per_page]) # Utiliza el mismo método auxiliar aquí
      }
    }
  end

  # Método auxiliar para calcular per_page
  def calculate_per_page(per_page_param)
    per_page = per_page_param.present? ? per_page_param.to_i : Kaminari.config.default_per_page
    per_page = 1000 if per_page > 1000
    per_page = Kaminari.config.default_per_page if per_page < 1
    per_page
  end
end
