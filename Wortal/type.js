
const SDK = self.SDK;

const PLUGIN_CLASS = SDK.Plugins.wortal;

PLUGIN_CLASS.Type = class WortalType extends SDK.ITypeBase
{
	constructor(sdkPlugin, iObjectType)
	{
		super(sdkPlugin, iObjectType);
	}
};
