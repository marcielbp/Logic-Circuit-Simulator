class Node
{
    constructor(posX, posY, isOutput = false, value = false)
    {
        this.diameter = 10;
        this.value = value;
        this.posX = posX;
        this.posY = posY;
        this.isOutput = isOutput;
        this.hitRange = this.diameter + 10;

        // only once input per node
        this.inputState = INPUT_STATE.FREE;

        this.isAlive = true; // not destroyed
        this.brotherNode = null; // for short circuit
    }

    destroy()
    {
        this.isAlive = false;
    }

    draw()
    {
        fillValue(this.value);

        stroke(0);
        strokeWeight(4);
        circle(this.posX, this.posY, this.diameter);

        if(this.isMouseOver())
        {
            fill(128, 128);
            noStroke();
            circle(this.posX, this.posY, this.hitRange)
        }
    }

    setInputState(state)
    {
        this.inputState = state;
    }

    setBrother(brotherNode)
    {
        this.brotherNode = brotherNode;
    }

    getBrother()
    {
        return this.brotherNode;
    }

    getValue()
    {
        return this.value;
    }

    setValue(value)
    {
        this.value = value;
    }

    updatePosition(posX, posY)
    {
        this.posX = posX;
        this.posY = posY;
    }

    isMouseOver()
    {
        if(dist(mouseX, mouseY, this.posX, this.posY) < (this.hitRange) / 2)
            return true;
        return false;
    }

    mouseClicked()
    {
        if(this.isMouseOver() && (this.inputState == INPUT_STATE.FREE || this.isOutput))
        {
            wireMng.addNode(this);
            return true;
        }
        return false;
    }
    

};

function fillValue(value)
{
    if(value)
        fill(255, 193, 7);
    else
        fill(52, 58, 64);
}