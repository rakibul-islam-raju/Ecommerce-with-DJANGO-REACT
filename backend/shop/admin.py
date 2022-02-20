from django.contrib import admin
from django.contrib.admin.sites import AlreadyRegistered
from django.apps import apps


"""
Register all the models
"""
app_models = apps.get_app_config("shop").get_models()
for model in app_models:
    try:
        admin.site.register(model)
    except AlreadyRegistered:
        pass
