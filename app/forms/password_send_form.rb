class PasswordSendForm
  include ActiveModel::Model

  attr_accessor(
    :email,
  )

  validates :email, presence: true, format: { with: /\A\S+@.+\.\S+\z/ }
  validate :email_exist

  def user
    User.find_by(email: email)
  end

  private

  def email_exist
    errors.add(:email, 'email not found!') if user.blank?
  end
end
