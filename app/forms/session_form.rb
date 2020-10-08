class SessionForm
  include ActiveModel::Model

  attr_accessor(
    :email,
    :password,
  )

  validates :email, presence: true, format: { with: /\A\S+@.+\.\S+\z/ }
  validates :password, presence: true
  validate :check_email_and_password_match

  def user
    User.find_by(email: email)
  end

  private

  def check_email_and_password_match
    errors.add(:email, "email or password doesn't match") if user.blank? || !user.authenticate(password)
  end
end
