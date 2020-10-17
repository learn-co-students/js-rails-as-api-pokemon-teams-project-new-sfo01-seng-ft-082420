class TrainersController < ApplicationController
	def index
	    render json: Trainer.all, include: :pokemons
	end
end
