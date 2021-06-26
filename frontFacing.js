const frontFacing = (x, y, isJumping = false) => {
	fill(255, 204, 153)
	let faceDiameter =  25
	let tenPercentFaceRadius = ((faceDiameter / 100) * 10.4)

	let twelvePercentFaceRadius = ((faceDiameter / 100) * 12) + 1
	let twenty4PercentFaceRadius = ((faceDiameter / 100) * 24)
	let fourty8PercentFaceRadius = ((faceDiameter / 100) * 48)
	let fivePercentFaceRadius = ((faceDiameter / 100) * 5)
	let thirty2PercentFaceRadius = ((faceDiameter / 100) * 34)
	let fourtyPercentFaceRadius = ((faceDiameter / 100) * 40)
	let sixty7PercentFaceRadius = ((faceDiameter / 100) * 67.2)

	//neck
	rect(x - (twelvePercentFaceRadius - 1), y + twelvePercentFaceRadius + 4, twenty4PercentFaceRadius, fourty8PercentFaceRadius)

	//Face
	stroke(.1)
	strokeWeight(0.1)
	circle(x, y, faceDiameter)
	fill(0, 0, 0)
	//Eyes
	circle(x - twelvePercentFaceRadius, y - twelvePercentFaceRadius, twelvePercentFaceRadius)//left eye
	circle(x + twelvePercentFaceRadius, y - twelvePercentFaceRadius, twelvePercentFaceRadius)//right eye
	noStroke()

	//Body
	let bodyHeight = faceDiameter + fivePercentFaceRadius
	let bodyX = x - (twelvePercentFaceRadius + thirty2PercentFaceRadius)
	let bodyY = y + (twelvePercentFaceRadius + fourtyPercentFaceRadius)
	fill(222, 82, 70)
	rect(bodyX, bodyY, faceDiameter, bodyHeight)

	//ARMS
	let ARMY = isJumping ? bodyY - sixty7PercentFaceRadius : bodyY + fivePercentFaceRadius
	//Left Arm
	let leftARMX = bodyX - thirty2PercentFaceRadius
	rect(leftARMX, bodyY, thirty2PercentFaceRadius, twenty4PercentFaceRadius, 20, 0, 0, 0)
	rect(leftARMX, ARMY, twenty4PercentFaceRadius, bodyHeight - 5, 20)

	//rightArm
	let rightARMX = bodyX + faceDiameter
	let rightARMX2 = bodyX + faceDiameter + tenPercentFaceRadius

	rect(rightARMX, bodyY, thirty2PercentFaceRadius, twenty4PercentFaceRadius, 0, 20, 0, 0)
	rect(rightARMX2, ARMY, twenty4PercentFaceRadius, bodyHeight - 5, 20)

	fill(76, 139, 245);
	let lowerBodyY = bodyY + bodyHeight
	//LOWER BODY
	rect(bodyX, bodyY + bodyHeight, faceDiameter, bodyHeight / 3)
	rect(bodyX, lowerBodyY, faceDiameter, bodyHeight / 3)
	//leg1
	rect(bodyX, lowerBodyY, faceDiameter / 3, bodyHeight / 1.2)//Left Leg
	//leg2
	// console.log("bodyx", bodyX)
	rect(bodyX + sixty7PercentFaceRadius, lowerBodyY, faceDiameter / 3, bodyHeight / 1.2)/// Right Leg
}