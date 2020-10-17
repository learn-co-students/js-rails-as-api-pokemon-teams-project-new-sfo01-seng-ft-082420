class PokemonsController < ApplicationController

	def index
	    pokemons = Pokemon.all
	    render json: pokemons
	end

	def create
		trainer = Trainer.find(params['trainer_id'])
		newPoke = Pokemon.find_or_create_by(nickname: Faker::Name.first_name, species: Faker::Games::Pokemon.name, trainer_id: params['trainer_id'])
		render json: {trainer: newPoke.trainer, newPoke: newPoke}
	end

	def destroy
		pokemon = Pokemon.find(params[:id])
		result = pokemon.destroy
		render json: result
	end

end
