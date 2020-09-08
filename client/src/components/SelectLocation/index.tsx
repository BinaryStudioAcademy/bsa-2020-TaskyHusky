import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Autocomplete, Marker, InfoWindow } from '@react-google-maps/api';
import styles from './styles.module.scss';
import { Location } from 'components/ProfileManager';
import { Button } from 'semantic-ui-react';
import { useTranslation } from 'react-i18next';

interface Props {
	changeLocation: (location: Location) => void;
	currentLocation: Location;
}

const containerStyle = {
	width: '100%',
	height: '500px',
};
const libraries = ['places'];

interface IAutocompleteInterface {
	getPlace: () => {
		geometry: any;
		formatted_address: string;
	};
}

const SelectLocation: React.FC<Props> = (props: Props) => {
	const googleApiKey = '';
	const { t } = useTranslation();
	const { changeLocation, currentLocation } = props;
	const [autocomplete, setAutocomplete] = useState<IAutocompleteInterface>();
	const [address, setAddress] = useState<string>(currentLocation.address);
	const [center, setCenter] = useState<{ lat: number; lng: number }>(currentLocation.location);
	const [open, setOpen] = useState<boolean>(false);

	const successCallback = (position: any) => {
		const lat = position.coords.latitude;
		const lng = position.coords.longitude;
		fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&sensor=true&key=${googleApiKey}`)
			.then((res) => res.json())
			.then((data) => {
				setCenter({ lat, lng });
				const newLocation = data.plus_code.compound_code.split(' ').slice(1).join(' ');
				setAddress(newLocation);
				setOpen(true);
			})
			.catch((err) => console.log(err));
	};

	const errorCallback = (error: any) => {
		console.log(error);
	};

	const getCurrentUserLocation = () => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
		} else {
			alert('Could not define location');
		}
	};

	const toggleInfoModal = () => setOpen(!open);

	const onLoad = (autocomplete: IAutocompleteInterface) => setAutocomplete(autocomplete);

	const onPlaceChanged = () => {
		if (autocomplete !== undefined) {
			const place = autocomplete.getPlace();
			if (!autocomplete.getPlace().geometry) {
				alert('Select a place from dropdown');
			} else {
				const {
					geometry: { location },
					formatted_address,
				} = place;
				setCenter({ ...center, lat: location.lat(), lng: location.lng() });
				setAddress(formatted_address.split(' ').slice(0, 2).join(' '));
				setOpen(true);
			}
		}
	};

	const saveCurrentLocation = () => {
		changeLocation({ address, location: center });
	};

	useEffect(() => {
		if (!center.lat || !center.lng) {
			getCurrentUserLocation();
		}
		//eslint-disable-next-line
	}, []);

	return (
		<>
			<Button className={styles.btnLink} type="button" onClick={getCurrentUserLocation}>
				{t('apply_current_location')}
			</Button>
			<LoadScript googleMapsApiKey={googleApiKey} libraries={libraries}>
				<GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10}>
					<Autocomplete
						onLoad={onLoad}
						onPlaceChanged={onPlaceChanged}
						onUnmount={() => console.log('unmount')}
						options={{
							types: ['(cities)'],
						}}
					>
						<input type="text" placeholder="Choose your location" className={styles.input} />
					</Autocomplete>
					<Marker position={center} onClick={toggleInfoModal}>
						{open && (
							<InfoWindow>
								<div className={styles.popup}>
									{address && <p className="standartLabel">{address}</p>}
									<Button
										className={`${styles.btnLink} ${styles.noneMargin}`}
										type="button"
										onClick={saveCurrentLocation}
									>
										{t('apply_this_location')}
									</Button>
								</div>
							</InfoWindow>
						)}
					</Marker>
				</GoogleMap>
			</LoadScript>
		</>
	);
};

export default React.memo(SelectLocation);
