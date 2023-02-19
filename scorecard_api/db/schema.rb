# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2023_02_18_210309) do
  create_table "courses", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "name"
    t.index ["name"], name: "index_courses_on_name", unique: true
  end

  create_table "pars", force: :cascade do |t|
    t.integer "hole_number"
    t.integer "value"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "course_id"
  end

  create_table "player_scores", force: :cascade do |t|
    t.integer "hole_number"
    t.integer "score"
    t.integer "player_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["player_id"], name: "index_player_scores_on_player_id"
  end

  create_table "players", force: :cascade do |t|
    t.string "name"
    t.integer "score_card_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["score_card_id"], name: "index_players_on_score_card_id"
  end

  create_table "score_cards", force: :cascade do |t|
    t.integer "course_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["course_id"], name: "index_score_cards_on_course_id"
  end

  create_table "tee_yardages", force: :cascade do |t|
    t.integer "hole_number"
    t.integer "yardage"
    t.integer "tee_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["tee_id"], name: "index_tee_yardages_on_tee_id"
  end

  create_table "tees", force: :cascade do |t|
    t.string "name"
    t.integer "course_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["course_id"], name: "index_tees_on_course_id"
  end

  add_foreign_key "player_scores", "players"
  add_foreign_key "players", "score_cards"
  add_foreign_key "score_cards", "courses"
  add_foreign_key "tee_yardages", "tees"
  add_foreign_key "tees", "courses"
end
