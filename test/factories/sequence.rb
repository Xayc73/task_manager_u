FactoryBot.define do
  sequence :string, aliases: [:first_name, :last_name, :password, :name, :state] do |n|
    "string#{n}"
  end
  sequence :text, aliases: [:description] do |n|
    "Lorem ipsum lorem ipsum lorem ipsum #{n}"
  end
  sequence :expired_at do |n|
    Date.current.since(n.days)
  end
  sequence :email do |n|
    "person#{n}@example.com"
  end
  sequence :avatar do |n|
    "avatars/#{n}.jpg"
  end
end
