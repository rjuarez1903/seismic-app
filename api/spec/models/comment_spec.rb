require 'rails_helper'

RSpec.describe Comment, type: :model do
  describe 'validations' do
    it 'is invalid without a body' do
      comment = Comment.new(body: nil)
      expect(comment).not_to be_valid
      expect(comment.errors.messages[:body]).to include("can't be blank")
    end

    it 'is valid with a body' do
      feature = Feature.create!(external_id: '123', title: 'Title', url: 'http://example.com', place: 'Place',
                                mag_type: 'ml', magnitude: 5.5, longitude: 0, latitude: 0)
      comment = feature.comments.build(body: 'This is a comment')
      expect(comment).to be_valid
    end
  end
end
