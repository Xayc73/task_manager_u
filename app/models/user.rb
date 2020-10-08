class User < ApplicationRecord
  has_many :my_tasks, class_name: 'Task', foreign_key: :author_id
  has_many :assigned_tasks, class_name: 'Task', foreign_key: :assignee_id
  has_secure_password
  validates :first_name, presence: true, length: { minimum: 2 }
  validates :last_name, presence: true, length: { minimum: 2 }
  validates :email, presence: true, format: { with: /@/ }, uniqueness: true

  def generate_password_token
    self.reset_password_token = generate_token
    self.reset_password_sent_at = Time.current.utc
  end

  def password_token_invalid?
    (reset_password_sent_at + 24.hours) < Time.current.utc
  end

  def reset_password(password)
    self.reset_password_token = nil
    self.reset_password_sent_at = nil
    self.password = password
  end

  private

  def generate_token
    SecureRandom.hex(10)
  end
end
