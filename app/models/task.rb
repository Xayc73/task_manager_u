class Task < ApplicationRecord
  belongs_to :author, class_name: 'User'
  belongs_to :assignee, class_name: 'User', optional: true
  validates :name, presence: true
  validates :description, presence: true
  validates :author, presence: true
  validates :description, length: { maximum: 500 }
  state_machine initial: :new_task do
    event :start_task do
      transition new_task: :in_development
    end

    event :reject_task do
      transition new_task: :archived
    end

    event :end_work do
      transition in_development: :in_qa
    end

    event :return_to_work do
      transition in_qa: :in_development
      transition in_code_review: :in_development
    end

    event :end_test do
      transition in_qa: :in_code_review
    end

    event :end_review do
      transition in_code_review: :ready_for_release
    end

    event :end_release do
      transition ready_for_release: :released
    end

    event :close_task do
      transition released: :archived
    end
  end
end
