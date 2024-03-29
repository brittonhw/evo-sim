import yaml
import os

config = {}

# todo: pick up this config path dynamically
with open('src/main/config/local_config.yaml', 'r') as file:
    config = yaml.safe_load(file)

if os.getenv('CI') is not None:
    config['env'] = 'gitlab-test'
