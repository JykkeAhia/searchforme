# Generated by Django 4.2 on 2023-04-14 15:20

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('search', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='SearchCarPrice',
            fields=[
                ('search_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='search.search')),
                ('parameter_model', models.CharField(max_length=256)),
                ('parameter_make', models.CharField(max_length=256)),
            ],
            options={
                'ordering': ['create_datetime'],
            },
            bases=('search.search',),
        ),
        migrations.RenameModel(
            old_name='SearchState',
            new_name='SearchEvent',
        ),
        migrations.AlterModelOptions(
            name='search',
            options={},
        ),
        migrations.RemoveField(
            model_name='search',
            name='term',
        ),
    ]