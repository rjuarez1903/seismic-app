class AdjustCommentsFeatureRelation < ActiveRecord::Migration[7.1]
  def change
    remove_foreign_key :comments, :features if foreign_key_exists?(:comments, :features)
    change_column :comments, :feature_id, :string
    add_index :comments, :feature_id unless index_exists?(:comments, :feature_id)
  end
end
