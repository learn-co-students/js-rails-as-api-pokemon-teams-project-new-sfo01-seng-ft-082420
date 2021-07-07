class PokemonsController < ApplicationController
	def create
		render json: Pokemon.create(
			nickname: Faker::Name.first_name, 
			species: Faker::Games::Pokemon.name, 
			trainer_id: params['trainer_id']
		)
	end

	def destroy
		render json: Pokemon.find(params[:id]).destroy
	end
end
