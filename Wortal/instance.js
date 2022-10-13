
const SDK = self.SDK;

const PLUGIN_CLASS = SDK.Plugins.wortal;

PLUGIN_CLASS.Instance = class WortalInstance extends SDK.IInstanceBase
{
	constructor(sdkType, inst)
	{
		super(sdkType, inst);
	}

	Release()
	{
	}

	OnCreate()
	{
	}

	OnPropertyChanged(id, value)
	{
	}

	LoadC2Property(name, valueString)
	{
		return false;		// not handled
	}
};
