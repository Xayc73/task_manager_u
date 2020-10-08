class PasswordSendForm
  include ActiveModel::Model

  attr_accessor(
    :email,
  )

  validates :email, presence: true, format: { with: /\A\S+@.+\.\S+\z/ }
  validate :check_user_exists

  def user
    User.find_by(email: email)
  end

  private

  def check_user_exists
    errors.add(:email, 'email not found!') if user.blank?
  end
end
