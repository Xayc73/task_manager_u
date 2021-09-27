FactoryBot.define do
  factory :user do
    first_name
    last_name
    password
    email
    avatar
    type { '' }
    reset_password_token
    reset_password_sent_at
  end

  factory :developer, parent: :user do
    type { 'Developer' }
  end

  factory :manager, parent: :user do
    type { 'Manager' }
  end

  factory :admin, parent: :user do
    type { 'Admin' }
  end
end
