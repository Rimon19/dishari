function Calculator()
{
	this.multiply = function(val1 , val2)
	{
		return (val1*val2);
	}
}

Calculator.prototype.multiply = function(val1 , val2)
{
	return (val1*val2);
}