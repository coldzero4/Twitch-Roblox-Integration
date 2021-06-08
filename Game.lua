local HttpService = game:GetService("HttpService")
local Url = -- URL GOES HERE

local Update_Frequency = 8
local Clear_Inputs_Threshold = 60
local Processed_Inputs = {}

local count = 0

-- // Directions 

local FromNormal = Vector3.FromNormalId
local directions_list = {
	up = FromNormal(Enum.NormalId.Front),
	down = FromNormal(Enum.NormalId.Back),
	left = FromNormal(Enum.NormalId.Left),
	right = FromNormal(Enum.NormalId.Right)
}

while true do
	local player = game.Players:GetChildren()[1]
	
	if player and player.Character then
		local queue_json = HttpService:RequestAsync{
			Url = Url,
			Method = "GET"
		}

		local queue = HttpService:JSONDecode(queue_json.Body)

		for index, direction in ipairs(queue) do
			if not table.find(Processed_Inputs, index) then
				table.insert(Processed_Inputs, index)

				local moving_dir = directions_list[direction]
				player.Character.Humanoid:MoveTo( player.Character.HumanoidRootPart.Position + moving_dir * 10 )
			end
		end
		
		count += 1
		
		if (count > Clear_Inputs_Threshold) then
			count = 0
			
			HttpService:RequestAsync{
				Url = Url .. ("?start=%d&end=%d"):format(0, #Processed_Inputs - 1),
				Method = "DELETE"
			}
			
			Processed_Inputs = {}
		end
	end
	
	wait( 1 / Update_Frequency )
end
