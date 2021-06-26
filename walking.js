
const walking = (x, y, isJumping = false, isLeft ) => {
    fill(255, 204, 153)
    let faceDiameter =  25
    let tenPercentFaceRadius = ((faceDiameter / 100) * 10.4)
    let twelvePercentFaceRadius = ((faceDiameter / 100) * 12) + 1
    let onePercentFaceRadius = ((faceDiameter / 100) * 1)

    let twenty4PercentFaceRadius = ((faceDiameter / 100) * 24)
    let twenty8PercentFaceRadius = ((faceDiameter / 100) * 28)

    let fourty8PercentFaceRadius = ((faceDiameter / 100) * 48)
    let fivePercentFaceRadius = ((faceDiameter / 100) * 5)
    let thirty2PercentFaceRadius = ((faceDiameter / 100) * 34)
    let fourtyPercentFaceRadius = ((faceDiameter / 100) * 40)
    let sixty7PercentFaceRadius = ((faceDiameter / 100) * 67.2)
    let fifty8PercentFaceRadius = ((faceDiameter / 100) * 58)

    //neck
    rect(x - (twelvePercentFaceRadius - 1), y + twelvePercentFaceRadius + 4, twenty4PercentFaceRadius, fourty8PercentFaceRadius)

    //Face
    stroke(.1)
    strokeWeight(0.1)
    ellipse(x, y, faceDiameter / 1.8, faceDiameter)

    fill(0, 0, 0)
    //Eyes
    let eyesX = isLeft ? x + onePercentFaceRadius - 1 : x + onePercentFaceRadius
    ellipse(eyesX, y - twelvePercentFaceRadius, twelvePercentFaceRadius / 1.7, twelvePercentFaceRadius / 1.2)//left eye
    noStroke()

    //Nose
    fill(255, 204, 153)
    let noseX = isLeft ? x - fourty8PercentFaceRadius : x + twelvePercentFaceRadius
    rect(noseX, y + fivePercentFaceRadius, twenty8PercentFaceRadius, tenPercentFaceRadius, 20)

    //Body
    let bodyHeight = faceDiameter + fivePercentFaceRadius
    let bodyWidth = faceDiameter / 1.4
    let bodyX = x - (fivePercentFaceRadius + thirty2PercentFaceRadius)
    let bodyY = y + (twelvePercentFaceRadius + fourtyPercentFaceRadius)
    fill(222, 82, 70)

    rect(bodyX, bodyY, bodyWidth, bodyHeight)

    //ARMS
    let ARMY = bodyY + fivePercentFaceRadius
    //Left Arm
    let leftARMX = (isLeft && isJumping) ? bodyX - fifty8PercentFaceRadius : bodyX + twenty4PercentFaceRadius
    let leftARMHeight = isJumping ? twenty4PercentFaceRadius : bodyHeight - 5
    let leftARMWidth = isJumping ? bodyHeight : twenty4PercentFaceRadius
    strokeWeight(.2)
    stroke(.02)
    rect(leftARMX, ARMY, leftARMWidth, leftARMHeight, 20)
    noStroke()

    fill(76, 139, 245);
    let lowerBodyY = bodyY + bodyHeight
    //LOWER BODY
    rect(bodyX, bodyY + bodyHeight, bodyWidth, bodyHeight / 3)
    rect(bodyX, lowerBodyY, bodyWidth, bodyHeight / 3)
    let leg1Height = bodyHeight / 1.2
    let leg1Width = faceDiameter / 3
    //leg1
    rect(bodyX + twelvePercentFaceRadius, lowerBodyY, leg1Width, leg1Height)//Left Leg
    //boot
    let bootLeft = bodyX - twelvePercentFaceRadius + fivePercentFaceRadius
    let bootRight = bodyX + twelvePercentFaceRadius + fivePercentFaceRadius
    let bootX = isLeft ? bootLeft : bootRight

    let topLeftRadius = isLeft ? 5 : 0
    let topRightRadius = isLeft ? 0 : 5
    rect(bootX, (lowerBodyY + leg1Height / 1.33), leg1Width * 1.5, leg1Width / 1.5, topLeftRadius, topRightRadius, 0, 0)//Left Leg

}