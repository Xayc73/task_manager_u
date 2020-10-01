admin = Admin.find_or_create_by(first_name: 'admin', last_name: 'admin', email: 'admin@admin.ru')
admin.password = 'admin'
admin.save

60.times do |i|
  u = [Manager, Developer].sample.new
  u.email = "email#{i}@mail.gen"
  u.first_name = "FN#{i}"
  u.last_name = "LN#{i}"
  u.password = "#{i}"
  u.save
end

80.times do |i|
  u = Task.new
  u.name = "Task ##{i}"
  u.description = "Description for task ##{i}"
  u.state = ["new_task", "in_development", "in_qa", "in_code_review", "ready_for_release", "released", "archived"].sample
  m_offset = rand(Manager.count)
  a_offset = rand(Developer.count)
  u.author = Manager.offset(m_offset).first
  u.assignee = Developer.offset(a_offset).first
  u.save
end